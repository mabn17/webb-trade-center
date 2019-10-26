const NavConfig = {
  defaults: [
    {
      name: 'Home',
      url: '/'
    },
    {
      name: 'About us',
      url: '/about'
    }
  ],
  loggedIn: [
    {
      name: 'My Account',
      url: '/account'
    },
    {
      name: 'Shop',
      url: '/shop'
    }
  ],
  buttons: {
    Sign: {
      name: 'Sign Up',
      url: '/register'
    },
    Login: {
      name: 'Login',
      url: '/login'
    },
    Logout: {
      name: 'Logout',
      url: '/login'
    }
  }
};

module.exports = NavConfig;