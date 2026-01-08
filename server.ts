import express from 'express';
import cors from 'cors';
// @ts-ignore
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json() as any);

// API Routes

// 1. Get All Patients
app.get('/api/patients', async (_req, res) => {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { updatedAt: 'desc' }
    });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

// 2. Create Patient
app.post('/api/patients', async (req, res) => {
  try {
    const patient = await prisma.patient.create({
      data: req.body
    });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create patient' });
  }
});

// 3. Get Dashboard Appointments (Projects)
app.get('/api/appointments', async (_req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true
      },
      orderBy: { updatedAt: 'desc' }
    });

    // Transform to match frontend "Project" type
    const formatted = appointments.map((app: any) => ({
      id: app.id,
      day: app.day,
      category: app.category,
      title: app.title,
      description: app.description || '',
      tags: app.tags,
      date: app.date,
      link: '#',
      physician: app.physician
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// 4. Update Appointment
app.patch('/api/appointments/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await prisma.appointment.update({
      where: { id },
      data: req.body
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// 5. Simple Login (In production, use JWT/Bcrypt)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (user && user.password === password) {
      const { password, ...userWithoutPass } = user;
      res.json(userWithoutPass);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Serve Static Files (Frontend) in Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')) as any);
  
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});