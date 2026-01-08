import express from 'express';
import cors from 'cors';
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
app.use(express.json());

// API Routes

// 1. Get All Patients
app.get('/api/patients', async (req, res) => {
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
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true,
        doctor: {
          select: { name: true }
        }
      },
      orderBy: { date: 'desc' }
    });
    
    // Transform to match frontend "Project" type
    const formatted = appointments.map(app => ({
      id: app.id.toString(),
      day: new Date(app.date).getDate(),
      category: app.category,
      title: app.title,
      description: app.description,
      tags: app.tags.split(','),
      date: new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      link: '#',
      physician: app.doctor.name,
      status: app.status // Include status for collaboration
    }));
    
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// 4. Update Appointment Status (Collaboration Feature)
// e.g., Doctor marks as "COMPLETED", Counter sees it and processes payment
app.patch('/api/appointments/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, prescription } = req.body;
  
  try {
    const updated = await prisma.appointment.update({
      where: { id: Number(id) },
      data: { 
        status,
        ...(prescription && { prescription })
      }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
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
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});