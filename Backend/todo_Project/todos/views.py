from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Todo
from .serializers import TodoSerializer


def home(request):
    return render(request, "todos/home.html")


class TodoListAPI(APIView):

    def get(self, request):
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TodoSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)


class TodoDetailAPI(APIView):

    def patch(self, request, id):
        todo = Todo.objects.get(id=id)

        serializer = TodoSerializer(
            todo,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)

    def delete(self, request, id):
        todo = Todo.objects.get(id=id)
        todo.delete()

        return Response({"message": "Todo deleted"})