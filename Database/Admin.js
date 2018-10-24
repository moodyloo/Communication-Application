function Admin (Forenames, Surename, Username, Email) {

  var admin = {
    'Forenames' : Forenames,
    'Surename' : Surename,
    'Username' : Username,
    'Email' : Email,
  };
  return admin;
}

module.exports = {
  GenerateAdmins: function generateAdmin() {
    var admins = [];

    admins.push(Admin('Maten','Rehimi','K1631403','maten.rehimi@kcl.ac.uk'));
    admins.push(Admin('Thiruchelvan','Senthilkumar','K1631435','thiruchelvan.senthilkumar@kcl.ac.uk'));
    admins.push(Admin('Antony','Kimpton','K1631398','antony.kimpton@kcl.ac.uk'));
    admins.push(Admin('Aakash','Ranade','K1631072','aakash.ranade@kcl.ac.uk'));
    admins.push(Admin('Caoky','Nguyen', 'K1630481','caoky.nguyen@kcl.ac.uk'));
    admins.push(Admin('John','Pham','K1630506','john.pham@kcl.ac.uk'));
    admins.push(Admin('Emmanuel','Wondimu','K1630993','emmanuel.wondimu@kcl.ac.uk'));
    admins.push(Admin('Ming','Wu','K1630477','ming.wu@kcl.ac.uk'));
    admins.push(Admin('Shivesh','Khetan','K1630462','shivesh.khetan@kcl.ac.uk'));
  }
};
