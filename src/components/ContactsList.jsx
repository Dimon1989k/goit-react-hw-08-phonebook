import s from '../Styles.module.css';
import { Loader } from './Loader/Loader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useContacts } from './Hooks/hooks';
import { contactsOperations } from '../redux/contacts/contactsOperations';
import { deleteToast } from './Toasts';
import { useSelector } from 'react-redux';
import authSelectors from '../redux/auth/auth-selectors';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const ContactsList = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  const dispatch = useDispatch();
  const { contacts, isLoaging, filter, deleteContact, setFilter } =
    useContacts();

  useEffect(() => {
    dispatch(contactsOperations.getContacts());
  }, [dispatch]);

  const findContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    if (contacts) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
  };

  const filteredContacts = findContacts();

  return (
    <div>
      {isLoaging && <Loader />}
      {isLoggedIn && (
        <ul className={s.items__container}>
          {contacts &&
            filteredContacts.map(({ id, name, number }) => {
              return (
                <li className={s.item} key={id}>
                  <h3 className={s.item__name}>{name}:</h3>
                  <p className={s.item__name}>{number}</p>
                  <Stack spacing={2} direction="row">
         <Button size="small"  variant="contained"
                    className={s.user__btn}
                    type="button"
                    onClick={() => {
                      deleteContact(id);
                      deleteToast(`${name} tel:${number} is deleted`);
                      setFilter('');
                    }}
                  >
                    Delete
                  </Button>
          
        </Stack>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};