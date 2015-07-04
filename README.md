# Miniflux-TodoMVC

I rebuilt [TodoMVC][todomvc] to learn how to use the ideas behind the [Flux][flux] architecture.

To learn more about my motivation behind this, checkout [this blog post][post].

You can see a working version of this running on [GH-Pages][pages].


## Technologies

I rely on various awesome libraries and tools here.
To name a few you might be interested in:
- [React][react]
- [Babel][babel] for .jsx and ES6 transpilation
- [React Router][reactrouter]
- [Webpack][webpack] together with [React Hot Loader][hotload] for an amazing development flow
- [Immutable.js][immutable] for awesome data structures
- [Tape][tape] for enjoyable testing


## Development

- Make sure you have [node.js][node] installed.
- Setup everything with `npm install`.
- Use `npm start` for development. You can find the app at [localhost:3000][localhost].
- To get a production version use 'npm run build'.
- For testing use `npm test`
or to keep running the tests on file changes use `npm run watch-tests`.


## Contributing

Let's help each other learning new things!

Feel free to ask in the [issues][issues], if you have some question.

If you can help me improve this example application open a [Pull Request][pr]
or start a discussion in the [issues][issues].


[todomvc]: http://todomvc.com/
[flux]: https://facebook.github.io/flux/
[post]: http://jorin.me/miniflux/
[pages]: https://jorin-vogel.github.io/miniflux-todomvc
[react]: http://facebook.github.io/react/
[babel]: https://babeljs.io/
[reactrouter]: http://rackt.github.io/react-router/tags/v1.0.0-beta3.html
[hotload]: https://github.com/gaearon/react-hot-loader
[webpack]: http://webpack.github.io/
[immutable]: http://facebook.github.io/immutable-js/
[tape]: https://github.com/substack/tape
[node]: http://nodejs.org/
[localhost]: http://localhost:3000/
[issues]: https://github.com/jorin-vogel/miniflux-todomvc/issues
[pr]: https://github.com/jorin-vogel/miniflux-todomvc/pulls


## License

MIT
