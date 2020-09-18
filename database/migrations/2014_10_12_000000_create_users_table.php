<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
			$table->string('external_id');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
			$table->timestamp('mobile_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->string('current_team_id')->nullable();
            $table->text('profile_photo_path')->nullable();
			$table->string('contact_number')->unique()->nullable();
			$table->string('city')->nullable();
			$table->string('state')->nullable();
			$table->text('address')->nullable();
			$table->boolean('userstatus')->default(true);
			$table->text('comment')->nullable();
			$table->string('last_login_ip',20)->nullable()->default(null);
			$table->timestamp('last_login_at')->nullable()->default(null);
			$table->unsignedBigInteger('created_by')->nullable();
			$table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
