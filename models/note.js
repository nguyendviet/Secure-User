module.exports = (sequelize, DataTypes)=>{
    var Note = sequelize.define('Note', {
        entry: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
              len: [1]
            }
        }
    });

    Note.associate = (models)=>{
        Note.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
  
    return Note;
};