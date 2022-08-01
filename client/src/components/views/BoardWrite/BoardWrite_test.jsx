export default function BoardWrite() {
  return (
    <div>
      <form
        action="/api/Board/create"
        method="post"
        enctype="multipart/form-data"
      >
        <label for="UpFile"></label>
        <input type="file" id="UpFile" name="UpFile" accept="image/*"></input>
        <input type="submit" value="제출"></input>
      </form>
    </div>
  );
}
