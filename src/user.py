import utils as utils
from email_validator import validate_email, EmailNotValidError
from datetime import date
import uuid as uuid_lib
import random
import re


class User:
    def __init__(self, email: str, first_name: str, second_name: str, password: str):
        '''
        Initializes a User object.
        You can assume that this code is correct.
        '''

        try:
            # Validate.
            valid = validate_email(email)

            # Update with the normalized form.
            self._email = valid.email
        except EmailNotValidError:
            raise ValueError('Bad email')

        self._first_name = first_name
        self._uuid = str(uuid_lib.uuid4())
        self._second_name = second_name
        if not User.validate_password_strength(password):
            raise ValueError('A password must be between 8-20 characters and contain at least \
                one uppercase letter, one number, and one special character.')
        self._password = utils.hash_str(password)

    def __str__(self) -> str:
        '''
        This function allows you to print out a user's information or represent a user as a string.
        You can assume that this function is correct. 

        ex: print(<user_object_here>)
        ex: str(<user_object_here>)
        '''
        return '\nUSER OBJECT:\nName:\t\t%s\nSecond_name:\t%s\nPassword:\t%s\nUUID:\t\t%s\n' \
               % (self._first_name, self._second_name, self._password[0], self._uuid)

    def __repr__(self) -> str:
        """
        This function allows you to view a user's information in a CLI.
        You can assume that this function is correct.
        """
        return str(self)

    @property
    def first_name(self) -> str:
        return self._first_name

    @property
    def uuid(self) -> str:
        return self._uuid

    @property
    def second_name(self) -> str:
        return self._second_name

    @property
    def password(self) -> (str, str):
        return self._password

    @property
    def email(self) -> (str, str):
        return self._email

    @classmethod
    def validate_password_strength(cls, password: str) -> bool:
        """
        Checks if the provided password has:
            - at least one special character: one of !@#$%^&*<>?
            - at least one upper case letter
            - at least one number
            - a length between 8 and 20 characters
        Returns True if the password meets the above requirements. Returns False otherwise.
        """
        if len(password) < 8 or len(password) > 20 or not re.search("[!@#$%^&*<>?]", password) or not re.search(
                "[A-Z]", password) or not re.search("[0-9]", password):
            return False
        else:
            return True

    def reset_password(self, new_password: str) -> None:
        """
        Checks whether the answer to the provided security question matches the **HASHED answer** to the same
        security question in the user's stored security questions. If the provided answer matches, this function
        resets the user's password to the provided password **that must now be hashed**.

        If the provided security question is not in the user's configured security questions,
        raise a TypeError

        Then, if the answer to the security question is incorrect, raise a PermissionError

        Then, if the user has answered the security question correctly, BUT the new password is not
        strong enough, raise a RuntimeError.

        Then, if the new password is the same as the old password, raise a ValueError.
        """

        old_password, password_salt = self._password

        if not User.validate_password_strength(new_password):
            raise RuntimeError('A password must be between 8-20 characters and contain at least \
                 one uppercase letter, one number, and one special character.')

        elif utils.check_str(new_password, old_password, password_salt):
            raise ValueError(
                'The new password cannot be the same as the old password.')

        else:
            self._password = utils.hash_str(new_password)
