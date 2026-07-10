import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Report } from '../../reports/entities/report.entity';
@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
