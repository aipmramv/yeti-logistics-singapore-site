-- Update the existing user to have admin role
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'aipm.ramv@gmail.com';