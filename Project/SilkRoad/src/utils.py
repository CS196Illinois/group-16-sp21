import hashlib
import os


def hash_str(s: str) -> (str, str):
    '''
    NOTE: There are no errors to debug in this function.
    Returns a tuple of strings (hash, salt) for the given string.
    A salt is a random string appended to a string to make the hashing function more secure.
    '''
    # generate the random salt
    salt = os.urandom(16)
    # use the hashlib library to hash the pin and the salt.
    return hashlib.pbkdf2_hmac('sha256', str.encode(str(s)), salt, 500), salt


def check_str(s: str, hashed_str: str, salt: str) -> bool:
    '''
    NOTE: There are no errors to debug in this function.
    Returns True if the plaintext string s is equivalent to the hashed_str for a given salt.
    Returns False otherwise.
    '''
    return hashlib.pbkdf2_hmac('sha256', str.encode(str(s)), salt, 500) == hashed_str
