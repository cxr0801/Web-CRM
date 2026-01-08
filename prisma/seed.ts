// @ts-ignore
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Create Users
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

  console.log('Users created:', { doctor, staff });

  // 2. Create Sample Patients
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

  console.log('Patients created:', { patient1, patient2 });

  // 3. Create Sample Appointments
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

  console.log('Appointments created');
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
