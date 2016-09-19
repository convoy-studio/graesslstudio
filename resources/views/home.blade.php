@extends('layout')

@section('content')
    
    

    <section id="app-container">
        
        <div class="top-part">

            <header>
                <div class='center-part'>
                    <p class="logo">GRAESSL STUDIO</p>
                    <p>PRODUCTION  CASTING  ART BUYING</p>
                </div>
            </header>


            <section id='container'>

                <ul id='slides-container'>
                @foreach ($data['slideshow'] as $slide)
                    <li>
                        <div class='image-container'>
                            <img src="images/{{ $slide['image'] }}">
                        </div>
                    </li>
                @endforeach
                </ul>

            </section>

            <footer>
                <ul>
                @for ($i = 0; $i < count($data['slideshow']); $i++)
                    <li>
                        <div class='slide-num'>{{ $data['slideshow'][$i]['title'] }}</div>
                    </li>
                @endfor
                </ul>
            </footer>

        </div>

        <section id='info-container'>
            <div class='inside-holder'>
                <div class='info-block'>
                    <h1>CLIENTS:</h1><br>
                    <ul>
                        @foreach ($data['clients'] as $client)
                            <li>
                            {{ $client['title'] }}
                            </li>
                        @endforeach
                    </ul>
                </div>
                <div class='info-block'>
                    <h1>PHOTOGRAPHERS:</h1><br>
                    <ul>
                        @foreach ($data['photographers'] as $photographer)
                            <li>
                            {{ $photographer['title'] }}
                            </li>
                        @endforeach
                    </ul>
                </div>
                <div class='info-block'>
                    <h1>CONTACT:</h1><br>
                    {!! $data['address'] !!}
                </div>
            </div>
        </section>

    </section>

@stop