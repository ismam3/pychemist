import re
import chemparse
import numpy as np
import sympy


class Equation:
    '''
    A class for chemical equation. You should initialize it with an unbalanced chemical equation (eg. NaOH+HCl=NaCl+H2O)
    '''
    def __init__(self,equation):
        if equation=='':
            raise Exception('Sorry!You have initialized nothing')
        else:
            self.equation = equation

    def parser(self):
        '''
        this method parses the equation into array of reactants and products
        :return:
        (reactants, products)
        '''
        try:
            reactants, products = self.equation.split("=")
            reactants = reactants.split("+")
            products = products.split("+")
            return reactants, products
        except:
            raise Exception("Please enter a valid equation")

    def molecules(self,part):
        '''
        this method gives you the number of molecules in reactant or product
        :param part: reactant or product
        :return: a dictionary>{'molecule_name':number}
        '''
        reactant_molecules = {}
        product_molecules = {}

        if part == "reactant":
            for x in self.parser()[0]:
                dic = chemparse.parse_formula(x)
                for ml in dic:
                    if ml in list(reactant_molecules):
                        reactant_molecules.update({ml: int(dic.get(ml)) + int(reactant_molecules.get(ml))})
                    else:
                        reactant_molecules.update({ml: dic.get(ml)})
            return reactant_molecules

        else:
            for x in self.parser()[1]:
                dic = chemparse.parse_formula(x)
                for ml in dic:
                    if ml in list(product_molecules):
                        product_molecules.update({ml: int(dic.get(ml)) + int(product_molecules.get(ml))})
                    else:
                        product_molecules.update({ml: dic.get(ml)})
            return product_molecules

    def coeffs(self):
        '''
        the method gives you array of respective molecule number
        :return:(reactant_coeffs,product_coeffs)
        '''
        a = []
        reactant_coeffs = []
        product_coeffs = []
        reactants,products = self.parser()
        def main(compound):
            a = []
            b = []
            for x in list(self.molecules("reactant")):
                dic = chemparse.parse_formula(compound)
                values = dic.get(x)
                if values == None:
                    a.append(0)
                else:
                    a.append(values)

            return a

        for reactant in reactants:
            reactant_coeffs.append(main(reactant))
        for product in products:
            product_coeffs.append(main(product))

        return reactant_coeffs, product_coeffs

    def balance(self):
        '''
        this method gives balanced equation
        :return:string of the inputted balanced equation
        '''
        reactant_coeffs, product_coeffs = self.coeffs()
        reactant_coeffs = np.array(reactant_coeffs)
        product_coeffs = np.array(product_coeffs)
        product_coeffs = np.multiply(product_coeffs,-1)
        matrix = np.concatenate((reactant_coeffs.transpose(),product_coeffs.transpose()),axis=1)
        matrix = sympy.Matrix(matrix)
        vector = matrix.nullspace()[0]
        fraction = 0
        for h in vector:
            if type(h) == sympy.core.numbers.Float:
                fraction = h
        multiplier_n = 1
        for multiplier in [2,3,5]:
            fraction = float(fraction)
            coef = fraction * multiplier
            if coef == round(coef):
                multiplier_n = multiplier



        for n in range(0,len(vector)):
            vector[n] = vector[n] * multiplier_n
        result = []
        for dt in vector:
            result.append(int(dt))

        reactants, products = self.parser()

        for a in range(0,len(reactants)):
            if result[a] == 1:
                reactants[a] = reactants[a]
            else:
                reactants[a] = str(result[a]) + reactants[a]
        b = (len(products) * -1)
        for c in range(b,0):
            if result[c] == 1:
                products[c]
            else:
                products[c] = str(result[c]) + products[c]


        result_equation = []
        for x in reactants:
            result_equation.append(x)
            if reactants.index(x) != len(reactants) -1:
                result_equation.append("+")
        result_equation.append("=")
        for x in products:
            result_equation.append(x)
            if products.index(x) != len(products) -1:
                result_equation.append("+")

        result_equation_str = ""
        for string in result_equation:
            result_equation_str = result_equation_str + string

        return result_equation_str
