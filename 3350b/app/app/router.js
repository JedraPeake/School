import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dynamicForms', { path: '/forms' });
  this.route('appointment', { path: '/appointment' });
  this.route('patient-profile', { path: '/profile'});
  this.route('exercises', { path: '/exercises'});
  this.route('dashboard', { path: '/dashboard'});
  this.route('clients', { path: '/clients'});
  this.route('questionLibrary', { path: '/question-library'});
  this.route('admin', { path: '/admin'});
  this.route('exercise');
  this.route('landing-page', {path: '/'});
  this.route('about', {path: '/about'});
  this.route('how-it-works', {path: '/how-it-works'});
  this.route('services', { path: 'services'});
  this.route('faq', { path: '/faq'});
  this.route('contact', { path: '/contact'});
  this.route('create-account', {path: '/create-account'})
  this.route('app');
  this.route('login');
  this.route('client-dashboard', {path: '/client-dashboard'});
  this.route('rehabilitations', {path: '/exercise-menus'});
  this.route('client-upload', {path: '/client-upload'});
  this.route('client-exercises', {path: '/client-exercises'});
  this.route('client-book', {path: '/client-book'});
  this.route('client-appointment', {path: '/client-appointment'});
  this.route('client-payment', {path: '/client-payment'});
  this.route('client-contact', {path: '/client-contact'});
  this.route('create-forms', {path: '/create-forms'});
  this.route('intro-form', {path: '/intro-form'});
  this.route('appointment', {path: '/appointment'});
  this.route('client-assessments', {path:'/client-assessments'});
  this.route('client-settings', {path:'/client-settings'});
  this.route('forgot-password', {path:'/forgot-password'});
  this.route('landing-form');
});

export default Router;
