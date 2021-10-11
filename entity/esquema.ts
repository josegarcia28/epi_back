/*import {EntitySchema} from "typeorm";

export const EmpleadoEntity = new EntitySchema({
    name: "Empleado",
    columns: {
        cod_art: {
            primary: true,
            type: String,
            length: 6
        },
        nombre: {
            type: String,
            length: 70
        },
        descripcion: {
            type: String,
            length: 240
        },
        talla: {
            type: String,
            length: 6
        },
        cod_tipo: {
            type: Number
        },
        color: {
            type: String,
            length: 6
        }
    },
    relations: {
        categories: {
            type: "many-to-one",
            target: "tipo_art" // CategoryEntity
        }
    }
});*/