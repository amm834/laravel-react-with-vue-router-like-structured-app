<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {

        $columnName = $request->input('column', 'id');
        $orderDirection = $request->input('direction', 'desc');

        if (!in_array($columnName, ['id', 'title'])) {
            $columnName = 'id';
        }

        if (!in_array($orderDirection, ['asc', 'desc'])) {
            $orderDirection = 'desc';
        }

        $filterable = ['id', 'title', 'content'];
        $filterableValues = array_filter($request->only(...$filterable));


        $posts = Post::with('category')
            ->when(count($filterableValues), function ($collection) use ($filterableValues) {
                foreach ($filterableValues as $column => $value) {
                    return $collection->where($column, 'like', '%' . $value . '%');
                }
            })
            ->when($request->filled('search'), function ($collection) use ($filterable, $request) {
                foreach ($filterable as $column) {
                    if ($column === $filterable[0]) {
                        $collection->where($column, 'like', "%{$request->search}%");
                    } else {
                        $collection->orWhere($column, 'like', "%{$request->search}%");
                    }
                }
            })
            ->when($request->filled('category_id'), function ($collection) use ($request) {
                return $collection->where('category_id', $request->category_id);
            })
            ->orderBy($columnName, $orderDirection)
            ->paginate(10);

        return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return Response
     */
    public function store(PostRequest $request)
    {

        if ($request->hasFile('image')) {
            $filename = $request->file('image')->getClientOriginalName();
            info($filename);
        }

        $post = Post::create($request->validated());

        return new PostResource($post);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Response
     */
    public function show(Post $post,)
    {
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param PostRequest $request
     * @param Post $post
     * @return PostResource
     */
    public function update(PostRequest $request, Post $post)
    {
        $post->update($request->validated());

        return new PostResource($post);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return \response()->noContent();
    }
}
