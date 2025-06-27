require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Cookiq Backend API is running!');
});


app.post('/users', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const picture = req.body.picture;
  const password = req.body.password;
  const subscription = req.body.subscription;
  const credits = req.body.credits;
  if (!name || !email) {
    return res.status(400).json(
      {
        message: 'Name and email are required.',
        message2: req
      });
  }

  try {

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(401).json({ message: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const randomIndex = Math.floor(Math.random() * 150) + 1;
    const profilePic = `https://avatar.iran.liara.run/public/${randomIndex}.png`
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        picture: profilePic,
        password: hashedPassword,
        subscription: subscription,
        credits: credits
      }
    }
    );
    res.status(201).json({ message: 'User registered successfully!', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error during user registration.' });
  }
});


app.post('/getUserCalories', async (req, res) => {

  try {
    const email = req.body.email;
    const data = await prisma.userMeal.findFirstOrThrow({
      where: {
        email: email
      }
    })

    if (data)
      return res.status(200).json({ data, "ok": true });
    else
      return res.status(304).json({ "ok": false })
  } catch (error) {
    console.log(error)
  }

})

app.post('/markAsComplete', async (req, res) => {
  const { email, title, calories, proteins } = req.body;

  try {
    const userMeal = await prisma.userMeal.findFirstOrThrow({
      where: { email },
    });

    if (!userMeal || !userMeal.recepies) {
      return res.status(404).json({ message: 'User or meals not found' });
    }

    const updatedMeals = userMeal.recepies.filter(meal => meal.title !== title);

    await prisma.userMeal.update({
      where: { email },
      data: {
        recepies: updatedMeals,
        caloriesIntook : userMeal.caloriesIntook + calories,
        proteinsIntook : userMeal.proteinsIntook +  proteins
      },
    });

    res.status(200).json({ message: 'Meal deleted successfully', "ok": true, updatedMeals });
  } catch (error) {
    console.error('Error deleting meal:', error);
    res.status(500).json({ message: 'Failed to delete meal', error });
  }
});


app.post('/addMealtoDaysPlan', async (req, res) => {
  try {
    const email = req.body.email;
    const recepie = req.body.recepie;
    const addRecepie = await prisma.userMeal.findFirst({
      where: { email: email }
      // orderBy : {createdAt : 'desc'}
    });
    console.log(addRecepie)
    if (addRecepie) {

      const updateRecepies = Array.isArray(addRecepie.recepies)
        ? [...addRecepie.recepies, recepie]
        : [addRecepie.recepies, recepie]

      await prisma.userMeal.update({
        where: { id: addRecepie.id },
        data: { recepies: updateRecepies }
      })

      res.status(200).json({ message: 'Meal added successfully', data: addRecepie, ok: true });
    }
    else {
      await prisma.userMeal.create({
        data: {
          email: email,
          recepies: [recepie]
        }
      });

      res.status(200).json({ message: 'New user recipe record created', ok: true });
    }

  } catch (error) {
    console.error('Error adding meal:', error);
    res.status(500).json({ message: 'Failed to add meal', error });
  }
})

app.post('/getDataOnRefresh', async (req, res) => {
  try {
    const email = req.body.email;
    const recepies = await prisma.userMeal.findFirstOrThrow({
      where: {
        email: email
      }
    })

    if (recepies)
      return res.status(200).json({ recepies })
  } catch (error) {
    console.log(error)
  }
})

app.post('/getuserdetails', async (req, res) => {
  try {
    const email = req.body.email;
    const userDetail = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (userDetail)
      return res.status(200).json({ userDetail })
  } catch (error) {
    return res.status(404).json({ error });
  }
})

app.post('/updateprofile', async (req, res) => {
  const { email, height,
    weight, goal, gender, calories, Proteins
  } = req.body;
  try {
    const updateUserProfile = await prisma.user.update({
      where: {
        email: email
      },
      data: {
        height: height,
        weight: weight,
        goal: goal,
        gender: gender,
        calories: calories,
        Proteins: Proteins
      }
    })
    if (!updateUserProfile) {
      return res.status(404).json({ message: "User not found" })
    }
    if (updateUserProfile) {
      return res.status(200).json({ user: updateUserProfile })
    }


  } catch (error) {
    console.log(error);
  }

})

app.post('/getuser', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const fetchedUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (fetchedUser) {
      const isPasswordValid = await bcrypt.compare(password, fetchedUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Wrong Password Entered ! Please check your password" })
      }
      return res.status(200).json({ user: fetchedUser });
    }
    else {
      return res.status(400).json({ message: "Please check your Email" });
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: error })
  }

})

app.listen(PORT, () => {
  console.log(`Cookiq Backend running on port ${PORT}`);
  console.log(`Access it at http://localhost:${PORT}`);
});
