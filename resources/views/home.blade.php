@extends('layout')

@section('content')



    <section id="app-container">

        <div class="top-part">

            <header>
                <div class='center-part'>
                    <h1 class="logo">GRAESSL STUDIO</h1>
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
                    <h2>CLIENTS:</h2>
                    <ul>
                        @foreach ($data['clients'] as $client)
                            <li>
                            {{ $client['title'] }}
                            </li>
                        @endforeach
                    </ul>
                </div>
                <div class='info-block'>
                    <h2>PHOTOGRAPHERS:</h2>
                    <ul>
                        @foreach ($data['photographers'] as $photographer)
                            <li>
                            {{ $photographer['title'] }}
                            </li>
                        @endforeach
                    </ul>
                </div>
                <div class='info-block'>
                    <h2>CONTACT:</h2>
                    {!! $data['address'] !!}
                </div>
            </div>
        </section>

    </section>

@stop
