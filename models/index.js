const User = require('./userModel');
const Property = require('./propertiesModel');
const Interested = require('./interestedModel');


Property.belongsToMany(User, {through: Interested, foreignKey:'propertyId'});
User.belongsToMany(Property, {through:Interested, foreignKey:'userId'});

// These lines create the reverse associations for eager loading:
Interested.belongsTo(User, { foreignKey: 'userId' });
Interested.belongsTo(Property, { foreignKey: 'propertyId' });

module.exports = {
    User,
    Property,
    Interested
}