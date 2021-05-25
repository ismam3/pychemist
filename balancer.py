import pychemist


print('Enter your chemical equation:')
inpt = input()
equation = pychemist.Equation(inpt)

print(equation.balance())
print(equation.molecules('reactant'))