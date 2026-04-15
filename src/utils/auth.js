export const getStoredUser = () => {
  try {
    const rawUser = localStorage.getItem('user');
    return rawUser ? JSON.parse(rawUser) : null;
  } catch (error) {
    return null;
  }
};

export const getDefaultRouteForUser = (user = getStoredUser()) => {
  if (!user) {
    return '/login';
  }

  return user.role === 'ADMIN' ? '/admin' : '/user';
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};
