import { Injectable, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entity/User.entity';
import { Repository } from 'typeorm';
import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
var jwt = require('jsonwebtoken');
require('dotenv').config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(name: any, email: any, password: any, req, res) {
    let success = false;
    try {
      //checkk if the user already exist in the database
      const euser = await this.userRepository.findOne({
        where: { email },
      });
      //console.log(euser);

      if (euser) {
        success = false;
        return res.status(400).send({
          success,
          message: `A user with the email ${email} already exists.`,
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const passwords = await bcrypt.hash(password, salt);

        const user = await this.userRepository.save({
          name: name,
          password: passwords,
          email: email,
        });
        const data = {
          user: {
            id: user.id,
          },
        };
        //console.log(user);

        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.status(201).json({ success, authtoken });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }

  async findOne(condition: any): Promise<User> {
    return this.userRepository.findOne({
      where: condition,
    });
  }

  async login(email: any, password: any, req, res) {
    let success = false;
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      console.log(user);

      if (!user) {
        let success = false;
        return res
          .send({
            success,
            error: `please enter valid credentials`,
          })
          .status(404);
      }
      const comparepassword = await bcrypt.compare(password, user.password);
      if (!comparepassword) {
        success = false;
        return res
          .send({
            success,
            error: `please enter valid credentials`,
          })
          .status(404);
      } else {
        const data = {
          user: {
            id: user.id,
          },
        };
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        return res.status(201).send({ success, authtoken });
        // return res.status(200).json(`user with email:${email} has been logged successfully`)
      }
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
}
