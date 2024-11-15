//custom.d.ts
declare module "movie-trailer" {
  function movieTrailer(query: string): Promise<string>;
  export default movieTrailer;
}
