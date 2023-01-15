import AccountCircle from '@mui/icons-material/AccountCircle';
import HouseIcon from '@mui/icons-material/House';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { logOut } from '../../redux/auth/authOperations';
import { selectIsLoggedIn, selectUserName } from '../../redux/auth/authSelectors';
import { updateFilter } from '../../redux/filters/contactFilterSlice';
import { selectContacts } from '../../redux/phonebook/phonebookSelectors';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const PrimarySearchAppBar: React.FC = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  const contacts = useSelector(selectContacts);
  const contactsCount = contacts.length;
  const contactsCountstring = () => {
    let ending = '';
    if (contactsCount === 0) {
      ending = 'ів';
    } else if (contactsCount >= 2 && contactsCount <= 4) {
      ending = 'а';
    } else if (contactsCount >= 5 && contactsCount <= 20) {
      ending = 'ів';
    } else if (contactsCount % 10 === 0 || contactsCount % 10 >= 5) {
      ending = 'ів';
    } else if (contactsCount % 10 >= 2 && contactsCount % 10 <= 4) {
      ending = 'а';
    }

    return `У Вас ${contactsCount ? contactsCount : 'немає'} контакт${ending}`;
  };
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const userMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isLoggedIn && (
        <MenuItem
          onClick={() => {
            navigate('/profile');
            handleMenuClose();
          }}
        >
          Профіль
        </MenuItem>
      )}
      {isLoggedIn && (
        <MenuItem
          onClick={() => {
            dispatch(logOut());
            handleMenuClose();
          }}
        >
          Вийти
        </MenuItem>
      )}
      {!isLoggedIn && (
        <MenuItem
          onClick={() => {
            navigate('/login');
            handleMenuClose();
          }}
        >
          Увійти
        </MenuItem>
      )}
      {!isLoggedIn && (
        <MenuItem
          onClick={() => {
            navigate('/registration');
            handleMenuClose();
          }}
        >
          Реєстрація
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate('/');
          handleMenuClose();
        }}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <HouseIcon />
        </IconButton>
        <p>Головна</p>
      </MenuItem>
      {isLoggedIn && (
        <MenuItem
          onClick={() => {
            navigate('/phonebook');
            handleMenuClose();
          }}
        >
          <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={contactsCount} color="error">
              <LocalPhoneIcon />
            </Badge>
          </IconButton>
          <p>Контакти</p>
        </MenuItem>
      )}

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Меню Користувача</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', cursor: 'pointer' } }}
            onClick={() => navigate('/')}
          >
            YoPhoBoo
          </Typography>
          {isLoggedIn && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Знайти контакт"
                inputProps={{ 'aria-label': 'search' }}
                onChange={({ target }) => {
                  dispatch(updateFilter(target.value.toLowerCase()));
                }}
              />
            </Search>
          )}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Typography component="div" noWrap>
              {isLoggedIn && (
                <Typography variant="body1" noWrap component="div">
                  Вітаємо, {userName}!
                </Typography>
              )}
              {isLoggedIn && (
                <Typography variant="body1" noWrap component="div">
                  {contactsCountstring()}
                </Typography>
              )}
            </Typography>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {userMenu}
    </Box>
  );
};

export default PrimarySearchAppBar;
