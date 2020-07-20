<?php

use Illuminate\Database\Seeder;
use App\Models\PlanFeature;
use App\Models\Plan;

class SubscriptionPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $plan = Plan::create([
            'name' => 'Free',
            'description' => 'Free plan',
            'price' => 0,
            'signup_fee' => 0,
            'invoice_period' => 1,
            'invoice_interval' => 'month',
            'sort_order' => 1,
            'currency' => 'INR',
        ]);

        // Create multiple plan features at once
        $plan->features()->saveMany([
            new PlanFeature(['name' => 'Free Signals', 'feature_key' => 'free', 'value' => 'signals', 'sort_order' => 1]),
            new PlanFeature(['name' => 'Free Charts', 'feature_key' => 'free', 'value' => 'charts', 'sort_order' => 5]),
        ]);


        $planMT = Plan::create([
            'name' => 'Pro',
            'description' => 'Pro plan',
            'price' => 199.99,
            'signup_fee' => 0,
            'invoice_period' => 1,
            'invoice_interval' => 'month',
            'trial_period' => 15,
            'trial_interval' => 'day',
            'sort_order' => 1,
            'currency' => 'INR',
        ]);

        // Create multiple plan features at once
        $planMT->features()->saveMany([
            new PlanFeature(['name' => 'ST Signals', 'feature_key' => 'st', 'value' => 'signals', 'sort_order' => 1]),
            new PlanFeature(['name' => 'ST Charts', 'feature_key' => 'st', 'value' => 'charts', 'sort_order' => 5]),
            new PlanFeature(['name' => 'MT Signals', 'feature_key' => 'mt', 'value' => 'signals', 'sort_order' => 1]),
            new PlanFeature(['name' => 'MT Charts', 'feature_key' => 'mt', 'value' => 'charts', 'sort_order' => 5]),
            new PlanFeature(['name' => 'LT Signals', 'feature_key' => 'lt', 'value' => 'signals', 'sort_order' => 1]),
            new PlanFeature(['name' => 'LT Charts', 'feature_key' => 'lt', 'value' => 'charts', 'sort_order' => 5]),
        ]);
    }
}
