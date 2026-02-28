import { pgTable, serial, varchar, timestamp, text, integer, boolean, numeric, customType, jsonb, index } from 'drizzle-orm/pg-core';

// custom pgvector type
const vector = customType<{ data: number[]; driverData: string }>({
  dataType() {
    return 'vector(384)';
  },
  toDriver(value: number[]): string {
    return `[${value.join(',')}]`;
  },
  fromDriver(value: string | unknown): number[] {
    if (typeof value === 'string') {
      return value.replace('[', '').replace(']', '').split(',').map(Number);
    }
    return [];
  }
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 150 }).notNull().unique(), // Replacing username with email
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  avatarUrl: varchar('avatar_url', { length: 255 }),
  lastActiveAt: timestamp('last_active_at', { withTimezone: true, mode: 'date' }),
  role: varchar('role', { length: 50 }).default('staff')
});

export const malls = pgTable('malls', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  location: varchar('location', { length: 255 }),
  imageUrl: varchar('image_url', { length: 255 })
});

export const units = pgTable('units', {
  id: serial('id').primaryKey(),
  mallId: integer('mall_id').references(() => malls.id, { onDelete: 'cascade' }),
  unitNo: varchar('unit_no', { length: 20 }).notNull(),
  level: varchar('level', { length: 50 }).notNull(),
  levelOrder: integer('level_order').default(0),
  status: varchar('status', { length: 50 }).default('vacant'),
  tenantName: varchar('tenant_name', { length: 100 }),
  personInCharge: varchar('person_in_charge', { length: 100 }),
  contactEmail: varchar('contact_email', { length: 100 }),
  contactPhone: varchar('contact_phone', { length: 20 }),
  areaSqm: numeric('area_sqm', { precision: 10, scale: 2 }),
  waterPoint: boolean('water_point').default(false),
  waterPipeDiameter: varchar('water_pipe_diameter', { length: 20 }),
  floorTraps: integer('floor_traps').default(0),
  acPowerKw: numeric('ac_power_kw', { precision: 10, scale: 2 }),
  fcuUnits: integer('fcu_units').default(0),
  electricIsolatorTpnVal: varchar('electric_isolator_tpn_val', { length: 50 }),
  emergencyLights: integer('emergency_lights').default(0),
  exitSignage: integer('exit_signage').default(0),
  paSpeaker: integer('pa_speaker').default(0),
  fibrePort: integer('fibre_port').default(0),
  dataPorts: integer('data_ports').default(0),
  gasPipe: boolean('gas_pipe').default(false),
  kitchenEa: boolean('kitchen_ea').default(false),
  kitchenEaVal: varchar('kitchen_ea_val', { length: 50 }),
  kitchenFa: boolean('kitchen_fa').default(false),
  kitchenFaVal: varchar('kitchen_fa_val', { length: 50 }),
  sprinkler: integer('sprinkler').default(0),
  unitModel: text('unit_model'),
  metadata: jsonb('metadata'),
  embedding: vector('embedding')
}, (table) => ({
  unitNoIdx: index('unit_no_idx').on(table.unitNo),
  mallIdIdx: index('mall_id_idx').on(table.mallId)
}));

export const salesKits = pgTable('sales_kits', {
  id: serial('id').primaryKey(),
  mallId: integer('mall_id').references(() => malls.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 100 }).notNull(),
  fileUrl: varchar('file_url', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).default('sales'),
  uploadedAt: timestamp('uploaded_at', { withTimezone: true, mode: 'date' }).defaultNow()
});

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }),
  phone: varchar('phone', { length: 50 }),
  company: varchar('company', { length: 100 }),
  type: varchar('type', { length: 50 }).notNull(),
  remark: text('remark'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow()
});

export const announcements = pgTable('announcements', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  author: varchar('author', { length: 100 }),
  role: varchar('role', { length: 50 }),
  targetProperty: varchar('target_property', { length: 100 }).default('General'),
  expiryDate: timestamp('expiry_date', { withTimezone: true, mode: 'date' }),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow()
});

export const chatLogs = pgTable('chat_logs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id'),
  message: text('message'),
  response: text('response'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow()
});

export const dashboardNotes = pgTable('dashboard_notes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  targetDate: varchar('target_date', { length: 10 }).notNull(), // YYYY-MM-DD
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow()
});

