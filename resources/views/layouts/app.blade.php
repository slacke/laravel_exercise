<!-- resources/views/layouts/app.blade.php -->

<!DOCTYPE html>
<html lang="en">


    <head>
    @include('include.header')
    </head>
    <body>
    @include('include.navbar')
    
    @yield('newtask')
    @yield('content')
    @yield('edit')

    @include('include.footer')  
    </body>
</html>