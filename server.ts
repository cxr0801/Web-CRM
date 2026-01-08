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

// 5. Initialize Database (Run once after deployment)
app.get('/api/init-db', async (_req, res) => {
  try {
    // Create test users
    const doctor = await prisma.user.upsert({
      where: { email: 'doctor@clinic.com' },
      update: {},
      create: {
        email: 'doctor@clinic.com',
        password: 'password123',
        name: '李華醫師',
        role: 'doctor',
      },
    });

    const staff = await prisma.user.upsert({
      where: { email: 'staff@clinic.com' },
      update: {},
      create: {
        email: 'staff@clinic.com',
        password: 'staff123',
        name: '陳護理師',
        role: 'staff',
      },
    });

    // Create sample patients
    const patient1 = await prisma.patient.upsert({
      where: { idNumber: 'A123456789' },
      update: {},
      create: {
        name: '陳小明',
        idNumber: 'A123456789',
        phone: '0912-345-678',
        email: 'chen@example.com',
        address: '台北市信義區',
      },
    });

    const patient2 = await prisma.patient.upsert({
      where: { idNumber: 'B987654321' },
      update: {},
      create: {
        name: '林怡君',
        idNumber: 'B987654321',
        phone: '0923-456-789',
        email: 'lin@example.com',
        address: '新北市板橋區',
      },
    });

    // Create sample appointments
    await prisma.appointment.upsert({
      where: { id: 'appointment-1' },
      update: {},
      create: {
        id: 'appointment-1',
        patientId: patient1.id,
        category: '耳鼻喉科',
        title: '陳小明 - 急性扁桃腺炎',
        description: '主訴：喉嚨劇痛、發燒39度、吞嚥困難。',
        physician: '李華醫師',
        date: '09:00 AM',
        day: 1,
        tags: ['發燒', '抗生素治療'],
      },
    });

    await prisma.appointment.upsert({
      where: { id: 'appointment-2' },
      update: {},
      create: {
        id: 'appointment-2',
        patientId: patient2.id,
        category: '耳鼻喉科',
        title: '林怡君 - 過敏性鼻炎',
        description: '主訴：換季打噴嚏、流鼻水、鼻塞嚴重影響睡眠。',
        physician: '王大明醫師',
        date: '09:15 AM',
        day: 2,
        tags: ['過敏', '慢性護理'],
      },
    });

    res.json({
      success: true,
      message: 'Database initialized successfully!',
      data: { users: 2, patients: 2, appointments: 2 }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to initialize database',
      details: error.message
    });
  }
});

// 6. Simple Login (In production, use JWT/Bcrypt)
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