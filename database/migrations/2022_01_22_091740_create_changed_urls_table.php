<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChangedUrlsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('changed_urls', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->text('origin_url');
            $table->string('short_url', 255);
            $table->bigInteger('click_count')->nullable()->default(12);
            $table->bigInteger('owner')->nullable()->default(12);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('changed_urls');
    }
}
