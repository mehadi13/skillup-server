const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.port || 5000;

const courses = require("./data/course.json");


app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/courses', (req, res) => {
  res.send(courses)
})

// Get a single course by ID
app.get('/courses/:id', (req, res) => {
  const courseId = req.params.id;
  const course = courses.find(course => course.course_id === courseId);

  if (course) {
      res.json(course);
  } else {
      res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/images', (req, res) => {
  // Extract all image URLs
  const imageUrls = courses.map(course => {
      return {
          img_url: course.img_url
      };
  });
  
  res.json(imageUrls);
});