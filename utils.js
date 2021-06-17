module.exports = {
    randId,
}
function randId(length){
var Id='';
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

var charlen = chars.length;

for(var i=0;i<length;i++){
    Id += chars.charAt(Math.floor(Math.random()*charlen));
}
return Id;
}