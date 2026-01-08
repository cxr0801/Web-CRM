import Dexie, { Table } from 'dexie';
import { User, PatientRecord, Project } from './types';
import { PATIENT_RECORDS, PROJECTS } from './constants';

export class ClinicDatabase extends Dexie {
  users!: Table<User>;
  patients!: Table<PatientRecord>;
  appointments!: Table<Project>;

  constructor() {
    super('ClinicDB');
    // Using (this as any) to resolve TypeScript error: Property 'version' does not exist on type 'ClinicDatabase'
    (this as any).version(1).stores({
      users: '++id, &email, role',
      patients: '++id, name, idNumber',
      appointments: '++id, date, category, physician'
    });
  }
}

export const db = new ClinicDatabase();

// Seed initial data if database is empty
export const seedDatabase = async () => {
  const userCount = await db.users.count();
  const patientCount = await db.patients.count();

  if (userCount === 0) {
    await db.users.bulkAdd([
      {
        email: 'doctor@clinic.com',
        password: 'password123',
        name: '李華醫師',
        role: 'doctor',
        createdAt: new Date(),
      },
      {
        email: 'admin@clinic.com',
        password: 'admin',
        name: '系統管理員',
        role: 'admin',
        createdAt: new Date(),
      },
      {
        email: 'nurse@clinic.com',
        password: 'nurse',
        name: '陳護理師',
        role: 'staff',
        createdAt: new Date(),
      }
    ]);
    console.log('Users seeded');
  }

  if (patientCount === 0) {
    // Modify existing constant data to fit DB if necessary, here we just clone
    await db.patients.bulkAdd(PATIENT_RECORDS);
    console.log('Patients seeded');
    
    // Also seed appointments for dashboard
    await db.appointments.bulkAdd(PROJECTS);
    console.log('Appointments seeded');
  }
};