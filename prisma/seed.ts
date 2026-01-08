import { PrismaClient } from '@prisma/client';
import { PATIENT_RECORDS, PROJECTS } from '../constants.js';

const prisma = new PrismaClient();

async function main() {
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
    where: { email: 'nurse@clinic.com' },
    update: {},
    create: {
      email: 'nurse@clinic.com',
      password: 'nurse',
      name: '陳護理師',
      role: 'staff',
    },
  });

  console.log({ doctor, staff });

  // 2. Create Patients from constants
  for (const p of PATIENT_RECORDS) {
    const createdPatient = await prisma.patient.upsert({
      where: { recordId: p.id },
      update: {},
      create: {
        recordId: p.id,
        name: p.name,
        gender: p.gender,
        dob: p.dob,
        age: p.age,
        idNumber: p.idNumber,
        phone: p.phone,
        email: p.email,
        address: p.address,
        emergencyContact: p.emergencyContact,
        emergencyPhone: p.emergencyPhone,
        firstVisitDate: p.firstVisitDate,
        lastVisitDate: p.lastVisitDate,
        mainSymptoms: p.mainSymptoms,
        duration: p.duration,
        pastHistory: p.pastHistory,
        familyHistory: p.familyHistory,
        allergies: p.allergies,
        currentMeds: p.currentMeds,
        height: p.height,
        weight: p.weight,
        bmi: p.bmi,
        bp: p.bp,
        hr: p.hr,
        sugar: p.sugar,
        cholesterol: p.cholesterol,
        smoking: p.smoking,
        drinking: p.drinking,
        exercise: p.exercise,
        sleepQuality: p.sleepQuality,
        stressLevel: p.stressLevel,
        notes: p.notes,
      },
    });
  }
  
  // 3. Create Appointments (Projects)
  // We link them to the first patient and doctor for demo purposes
  const firstPatient = await prisma.patient.findFirst();
  
  if (firstPatient && doctor) {
    for (const proj of PROJECTS) {
      // Check if exists to avoid duplicates on re-seed
      const count = await prisma.appointment.count({
        where: { title: proj.title }
      });
      
      if (count === 0) {
        // Create date based on "09:00 AM" string roughly
        const today = new Date();
        today.setHours(9, 0, 0, 0);

        await prisma.appointment.create({
          data: {
            date: today, 
            category: proj.category,
            title: proj.title,
            description: proj.description,
            tags: proj.tags.join(','),
            physicianId: doctor.id,
            patientId: firstPatient.id,
            status: 'PENDING'
          }
        });
      }
    }
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    (process as any).exit(1);
  });