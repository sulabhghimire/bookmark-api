import {Test} from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "../src/prisma/prisma.service";
import * as pactum from 'pactum';
import { AuthDto } from "src/auth/dto";

describe('App e2e', ()=>{

  let app:INestApplication;
  let prisma: PrismaService;

  beforeAll(async() => {
    const moduleRef = await Test.createTestingModule({
      imports:[AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333/');
  });

  afterAll(async()=>{
    app.close();
  })

  describe('Auth', ()=>{

    const dto:AuthDto = {
      email: 'sulabh.ghimire@gmail.com',
      password: 'Admin@123',
    }

    describe('Sign Up', ()=>{

      it('should throw exception if email is empty', ()=>{
        return pactum.spec().post('auth/signup').withBody({
          password: dto.password
        }).expectStatus(400);
      });

      it('should throw exception if email is not valid email', ()=>{
        return pactum.spec().post('auth/signup').withBody({
          email: 'asda@asda',
          password: dto.password,
        }).expectStatus(400);
      })

      it('should throw exception if password is empty', ()=>{
        return pactum.spec().post('auth/signup').withBody({
          email: dto.email
        }).expectStatus(400);
      })

      it('should throw exception if no body provided', ()=>{
        return pactum.spec().post('auth/signup').expectStatus(400);
      })

      it('Should SignUp', ()=>{
        return pactum.spec().post('auth/signup').withBody(dto).expectStatus(201);
      });

      it('Should Throw Error If User with email already exists', ()=>{
        return pactum.spec().post('auth/signup').withBody(dto).expectStatus(403);
      });
    });

    describe("Log In", ()=>{

      it('should throw exception if email is empty', ()=>{
        return pactum.spec().post('auth/login').withBody({
          password: dto.password
        }).expectStatus(400);
      });

      it('should throw exception if email is not valid email', ()=>{
        return pactum.spec().post('auth/login').withBody({
          email: 'asdasdasdasd@asda',
          password: dto.password,
        }).expectStatus(400);
      })

      it('should throw exception if password is empty', ()=>{
        return pactum.spec().post('auth/login').withBody({
          email: dto.email
        })
      });

      it('should throw exception if no body provided', ()=>{
        return pactum.spec().post('auth/login').expectStatus(400);
      })

      it('Should throw error if password is incorrect', ()=>{
        return pactum.spec().post('auth/login').withBody({...dto, password: 'randomPass'}).expectStatus(403);
      });

      it('Should SignIn', ()=>{
        return pactum.spec().post('auth/login').withBody(dto).expectStatus(200).stores('userAt', 'access_token');
      });
    });

  });

  describe('User', ()=>{

    describe('Get Me', () => {

      it('Should throw error when no Bearer token is supplied', ()=>{
        return pactum.spec().get('/users/me').expectStatus(404);
      });

      it('Should throw error when no Invalid Bearer token is supplied', ()=>{
        return pactum.spec().get('/users/me').withHeaders({
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OSflKxwRJSMeKKF2QT4fwpMeJf36POc'
        }).expectStatus(404);
      });

      it('Should get current user', ()=>{
        return pactum.spec().get('users/me').withHeaders({
          Authorization: 'Bearer $S{userAt}'
        }).expectStatus(200);
      })
    });

    describe('Edit User', () => {

    });

  });

  describe("Bookmarks", ()=>{

    describe('Create BookMarks', () => {

    });

    describe('Get BookMarks', () => {

    });

    describe('Get BookMark By Id', () => {

    });

    describe('Edit BookMark', () => {

    });

    describe('Delete BookMark', () => {

    });

  });
});