import * as bcrypt from 'bcrypt'
import { check } from 'express-validator/check'
import { Pessoa } from '../models/pessoaModel'

export const PessoaRules = {
  forRegister: [
    check('email')
      .isEmail().withMessage('E-mail inválido')
      .custom(email => 
                       Pessoa.findOne({ where: { email } })
                       .then((u:any) => !!!u))
                       .withMessage('E-mail já cadastrado.'),
    check('password')
      .isLength({ min: 8 }).withMessage('Senha inválida'),
    check('confirmPassword')
      .custom((confirmPassword, { req }) => req.body.password === confirmPassword).withMessage('Confirma senha diferente de senha.')
  ],

  forLogin: [
    check('email')
      .isEmail().withMessage('E-mail inválido')
      .custom(email => Pessoa.findOne({ where: { email } }).then((u:any) => !!u)).withMessage('E-mail ou senha invalidos'),
    check('password')
      .custom((password, { req }) => {
        return Pessoa.findOne({ where: { email: req.body.email } })
          .then((u:any) => bcrypt.compare(password, u!.password))
      }).withMessage('E-mail ou senha invalidos')
  ]
}