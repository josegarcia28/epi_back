/*import { Entity, Column, ManyToOne, Index, PrimaryGeneratedColumn} from 'typeorm';
import { empleado } from '../entity/empleado';
import { asignacion } from '../entity/asignacion';

@Entity()
@Index([
    'reg_asig',
    'cod_asig'
])
export class detalle_asig {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    reg_asig : string ;	
    @Column()
    cod_asig: string;   
    @Column()
    cod_art: string;
    @Column()
    cantidad: number;	
    @Column()
    cod_emp: string;	

    @ManyToOne(() => empleado, emple => emple.cod_emp)
    emple: empleado;
    @ManyToOne(() => asignacion, asig => asig.cod_asig)
    asig: asignacion;
}*/