What is the purpose of using sessions?
well sessions let us create a sort of state that holds some data we can verify

What does bcrypt do to help us store passwords in a secure manner.
well it encrypts and decrypts passwords (and maybe even usernames... might try that later for fun) so that our db that stores everything is not storing plain text, and thus is a lot less
hackable

What does bcrypt do to slow down attackers?
well... basically the last question.  They can't find any plain text passwords lying around
if they get inside our db

What are the three parts of the JSON Web Token?
the header, payload and signature really