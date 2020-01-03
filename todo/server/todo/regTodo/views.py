from django.shortcuts import render
from django.views.generic.edit import FormView
from django.contrib.auth.forms import UserCreationForm
from django.db import models
from django.contrib.auth.models import User
from django import forms
# Create your views here.

##class User (User):
##    email = models.EmailField(unique=True)
User._meta.get_field('email')._unique = True

class UserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True, label='Email--')
    password1 = forms.PasswordInput()
    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.email = self.cleaned_data["email"]
        if commit:
            user.save()
        return user

class RegisterForm(FormView):
    form_class = UserCreationForm
    success_url = "/admin/"
    template_name = "UsersForms/register.html"
    fields = []

    def form_valid (self, form):
        form.save()
        return super(RegisterForm, self).form_valid(form)