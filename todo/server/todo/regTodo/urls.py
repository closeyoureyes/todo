from django.urls import path


app_name = "regTodo"
urlpatterns = [ path("signup/", views.RegisterForm.as_view())
]