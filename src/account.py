from typing import List, Any

from src.transaction import Transaction, TransactionType
import src.utils as utils
from src.user import User

from datetime import datetime
import uuid as uuid_lib
from enum import Enum


class AccountType(Enum):
    CHECKING = 'Checking'
    SAVINGS = 'Savings'
    MONEY_MARKET = 'Money Market'

    @classmethod
    def str_to_enum(cls, s: str):
        for a in [cls.CHECKING, cls.SAVINGS, cls.MONEY_MARKET]:
            if a.value == s:
                return a
        return None


class Account:
    """
    Stores the information for an account. Each account has an associated AccountType enum
    representing the type of the account. The account stores the uuid of the account owner, and
    an associated pin which must match the pin in a transaction in order for the transaction to
    be valid. The pins are hashed (with a salt) when stored for security. The daily withdrawal
    limit represents the maximum total amount a user can withdraw on a given day.
    """

    def __init__(self, user: User, account_type: AccountType, pin: str, initial_balance: float, daily_withdrawal_limit=1000.0):
        """
        Initializes a new Account object.
        You can assume that this code is correct.
        """
        self._account_type = account_type
        self._owner = user
        self._balance = initial_balance
        self._history = []
        self._daily_withdrawal_limit = daily_withdrawal_limit
        self._uuid = str(uuid_lib.uuid4())
        self._hashed_pin, self._hashed_pin_salt = utils.hash_str(pin)

    def __str__(self) -> str:
        """
        This function allows you to print out the details of an Account object or represent an Account object as a string.
        You can assume that this function is correct.

        ex: print(<account_object_here>)
        ex: str(<account_object_here>)
        """
        return '\nACCOUNT OBJECT:\nAccount Type:\t%s\nOwner\'s Name:\t%s\nOwner\'s UUID:\t%s\nAccount UUID:\t%s\nBalance:\t%f\nWithdraw Limit:\t%f\n' \
            % (str(self._account_type.name), self.owner.name, self.owner.uuid, self._uuid, self._balance,
               self._daily_withdrawal_limit)

    def __repr__(self) -> str:
        """
        This function allows you to view an Account object in a CLI.
        You can assume this function is correct.
        """
        return str(self)

    @property
    def account_type(self) -> AccountType:
        return self._account_type

    @property
    def uuid(self) -> str:
        return self._uuid

    @property
    def owner(self) -> User:
        return self._owner

    @property
    def history(self) -> list:
        return self._history

    @property
    def hashed_pin(self) -> str:
        return self._hashed_pin

    @property
    def daily_withdrawal_limit(self) -> float:
        return self._daily_withdrawal_limit

    @daily_withdrawal_limit.setter
    def daily_withdrawal_limit(self, new_limit: float) -> None:
        self._daily_withdrawal_limit = new_limit

    @property
    def balance(self) -> float:
        return self._balance

    @balance.setter
    def balance(self, new_balance: float) -> None:
        self._balance = new_balance

    def validate_transaction(self, transaction: Transaction) -> bool:
        """
        Returns True if both the Transaction user's uuid and pin match the account owner's uuid
        and pin respectively.
        Returns False otherwise.
        """
        if self._owner.uuid is transaction.user_uuid and utils.check_str(transaction.pin, self._hashed_pin,
                                                                         self._hashed_pin_salt):
            return True
        else:
            return False

    def get_withdraw_total_on_date(self, target_date: datetime) -> float:
        """
        Returns the total amount withdrawn on target_date.
        """
        total = 0
        transactions_on_date = [t.amount for t in self.history if (
            t.timestamp.year == target_date.year and t.timestamp.month == target_date.month and
            t.timestamp.day == target_date.day and t.transaction_type == TransactionType.WITHDRAW)]
        for amt in transactions_on_date:
            total += amt
        return total

    def update(self, transaction: Transaction) -> None:
        """
        Updates the account balance based on a Transaction.
        - If the transaction is invalid, raises a RunTimeError (hint: use validate_transaction!).
        - In the case of a Deposit, the balance is augmented by the Transaction amount. Raises a ValueError
        if the deposit amount is less than 0.
        - In the case of a Withdrawal, the balance is reduced by the Transaction amount. Raises a ValueError
        if making the withdrawal would cause the total withdrawals on the current day to exceed the daily withdrawal
        limit (hint: use get_withdraw_total_on_date!). Raises a ValueError if the Withdrawal amount is less than 0,
        or if the account does not have sufficient funds to withdraw the Withdrawal amount.
        - If the transaction was successfully completed, adds the Transaction to the history list.
        """
        if not self.validate_transaction(transaction):
            raise RuntimeError('Transaction invalid')

        if transaction.transaction_type == TransactionType.DEPOSIT:
            if not transaction.amount <= 0:
                self._balance += transaction.amount
                self._history.append(transaction)
            else:
                raise ValueError('Deposit value negative; invalid')

        elif transaction.transaction_type == TransactionType.WITHDRAW:
            if self.get_withdraw_total_on_date(transaction.timestamp) + transaction.amount > self.daily_withdrawal_limit:
                raise ValueError('Withdrawal exceeds daily limit')
            elif transaction.amount < 0 or self._balance - transaction.amount <= 0:
                raise ValueError('Transaction amount negative or account has insufficient funds')
            else:
                self._balance -= transaction.amount
                self._history.append(transaction)

    def get_withdraw_history(self) -> list:
        """
        Returns a list of all Withdrawal transactions for this account.
        """
        return [t for t in self._history if t.transaction_type == TransactionType.WITHDRAW]

    def get_deposit_history(self) -> list:
        """
        Returns a list of all Deposit transactions for this account.
        """
        return [t for t in self._history if t.transaction_type == TransactionType.DEPOSIT]
