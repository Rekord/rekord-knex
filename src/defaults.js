
var Rekord = require('rekord');

Rekord.Defaults.returning = '*';
Rekord.Defaults.cascade = Rekord.Cascade.Rest;
Rekord.Defaults.cache = Rekord.Cache.None;

Rekord.Relations.hasOne.auto =
Rekord.Relations.belongsTo.auto =
Rekord.Relations.hasMany.auto =
Rekord.Relations.hasManyThrough.auto =
  false;

Rekord.Relations.hasOne.saveCascade =
Rekord.Relations.hasOne.autoCascade =
Rekord.Relations.hasOne.cascade =
Rekord.Relations.belongsTo.autoCascade =
Rekord.Relations.belongsTo.cascade =
Rekord.Relations.hasMany.autoCascade =
Rekord.Relations.hasMany.saveParentCascade =
Rekord.Relations.hasManyThrough.autoCascade =
Rekord.Relations.hasManyThrough.cascadeSave =
Rekord.Relations.hasManyThrough.saveParentCascade =
  Rekord.Cascade.Rest;
