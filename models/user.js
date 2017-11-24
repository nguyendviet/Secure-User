module.exports = (sequelize, DataTypes)=>{
    var User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1, 255]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 72]
              }
        }
    });

    User.associate = (models)=>{
        User.hasMany(models.Note, {
          onDelete: "cascade"
        });
    };
  
    return User;
};