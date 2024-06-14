import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const TodoModel = sequelize.define( 
    'Todo',{
        text:{
            type:DataTypes.STRING,
            allowNull:false
        },
        isCompleted:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    }
)
export default TodoModel