<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class PagesController extends Controller
{
    public function home()
    {

    	$path = storage_path() . "/json/data.json";
	    $str = file_get_contents($path);
	    $data = json_decode($str, true);
	    $data['total_slideshow_items'] = count($data['slideshow']);

	    shuffle($data['slideshow']);

    	return view('home')->with('data', $data);
    }
	
}
