from django import forms
from .models import Todo

class TodoForm(forms.Modelform):
    class Meta:
        model = Todo
        fields = ["title"]