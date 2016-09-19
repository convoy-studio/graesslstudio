
<!DOCTYPE html>
<html>
    <head>

        <meta charset="utf-8">
        <title>Graessl Studio</title>
        <meta name="description" content="Graessl Studio">
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">

        <meta property="og:title" content="Graessl Studio" />
        <meta property="og:description" content="Graessl Studio" />
        <meta property="og:image" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://graesslstudio.com" />

        <meta name="robots" content="index, follow">
        <link rel="canonical" href="http://graesslstudio.com/" />
		
		<link rel="stylesheet" href="{{ URL::asset('css/app.css') }}">
		
		<link href="{{ URL::asset('favicon.ico') }}" rel="icon" type="image/x-icon" />

    </head>
    <body>

		@yield('content')

		<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
		<script type="text/javascript" src="{{ URL::asset('js/all.js') }}"></script>

    </body>
</html>
