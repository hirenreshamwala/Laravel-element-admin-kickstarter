<?php

namespace App\Http\Controllers\Admin;

use App\Models\Jobs;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function reports(Request $request)
    {


        $daysTable = DB::table(DB::raw("(select curdate() as day
           union select curdate() - interval 1 day
           union select curdate() - interval 2 day
           union select curdate() - interval 3 day
           union select curdate() - interval 4 day
           union select curdate() - interval 5 day
           union select curdate() - interval 6 day) days"));

        $newJobData = $daysTable->cloneWithout([])
            ->select(DB::raw('DATE_FORMAT(days.day, \'%d/%m/%Y\') as day, count(j.id) as total'))
            ->leftJoin('jobs as j', function ($join){
                $join->on('days.day','=',DB::raw('DATE(j.created_at)'));
            })
            ->groupBy('days.day')->get();

        $processingJobData = $daysTable->cloneWithout([])
            ->select(DB::raw('DATE_FORMAT(days.day, \'%d/%m/%Y\') as day, count(j.id) as total'))
            ->leftJoin('jobs as j', function ($join){
                $join->on('days.day','=',DB::raw('DATE(j.processing_on)'));
            })
            ->groupBy('days.day')->get();

        $finishedJobData =$daysTable->cloneWithout([])
            ->select(DB::raw('DATE_FORMAT(days.day, \'%d/%m/%Y\') as day, count(j.id) as total'))
            ->leftJoin('jobs as j', function ($join){
                $join->on('days.day','=',DB::raw('DATE(j.finished_on)'));
            })
            ->groupBy('days.day')->get();


//        $fromDate = Carbon::now()->subDay(6)->startOfDay();
//        $toDate = Carbon::now();
//        $newJobData = Jobs::select(DB::raw('count(id) as total'),DB::raw('YEAR(created_at) as year'),DB::raw('MONTH(created_at) as month'),DB::raw('DAY(created_at) as day'))
//            ->where('job_status','=','New')
//            ->whereBetween('created_at', [$fromDate, $toDate])
//            ->groupBy(DB::raw('YEAR(created_at)'))
//            ->groupBy(DB::raw('MONTH(created_at)'))
//            ->groupBy(DB::raw('DAY(created_at)'))->get();

        return [
            'newjobs' => $newJobData,
            'in_process' => $processingJobData,
            'finished' => $finishedJobData
        ];
    }

    public function jobstatus(){
        $_Data = Jobs::select(DB::raw('count(id) as total'),'job_status')
            ->groupBy('job_status')->get();

        return $_Data;
    }

    public function todays_counter(){
        $toDate = Carbon::now();
        $newJobData = Jobs::select(DB::raw('count(id) as total'))
            ->where('job_status','=','New')
            ->where(DB::raw('created_at'),'=',$toDate->toDateString())
            ->groupBy('created_at')->first();

        $processingJobData = Jobs::select(DB::raw('count(id) as total'))
            ->where('job_status','=','New')
            ->where(DB::raw('processing_on'),'=',$toDate->toDateString())
            ->groupBy('processing_on')->first();

        $finishedJobData = Jobs::select(DB::raw('count(id) as total'))
            ->where('job_status','=','New')
            ->where(DB::raw('finished_on'),'=',$toDate->toDateString())
            ->groupBy('finished_on')->first();
        return [
            'count_new' => ($newJobData && $newJobData->total) ? $newJobData->total : 0,
            'count_process' => ($processingJobData && $processingJobData->total) ? $processingJobData->total : 0,
            'count_finished' => ($finishedJobData && $finishedJobData->total) ? $finishedJobData->total : 0,
        ];
    }

}
