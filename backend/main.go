package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"
)

type Task struct {
	Id        int       `json:"id,omitempty"`
	CreatedAt time.Time `json:"createdAt,omitempty"`
	Height    int       `json:"height,omitempty"`
	Neck      float32   `json:"neck,omitempty"`
	Waist     float32   `json:"waist,omitempty"`
	Hip       float32   `json:"hip,omitempty"`
}

var Tasks []Task = []Task{
	Task{
		Id:        1,
		CreatedAt: time.Now(),
		Height:    198,
		Neck:      38,
		Waist:     95,
		Hip:       0,
	},
	Task{
		Id:        2,
		CreatedAt: time.Now().Add(time.Hour * 168), /* .Add(time.Hour * 168) */
		Height:    198,
		Neck:      39,
		Waist:     94,
		Hip:       0,
	},
	Task{
		Id:        3,
		CreatedAt: time.Now().Add(time.Hour * (168 * 2)),
		Height:    198,
		Neck:      39,
		Waist:     93,
		Hip:       0,
	},
	Task{
		Id:        4,
		CreatedAt: time.Now().Add(time.Hour * (168 * 3)),
		Height:    198,
		Neck:      39,
		Waist:     92,
		Hip:       0,
	},
	Task{
		Id:        5,
		CreatedAt: time.Now().Add(time.Hour * (168 * 4)),
		Height:    198,
		Neck:      40,
		Waist:     90,
		Hip:       0,
	},
	Task{
		Id:        6,
		CreatedAt: time.Now().Add(time.Hour * (168 * 5)),
		Height:    198,
		Neck:      38,
		Waist:     95,
		Hip:       0,
	},
}

func del(Tasks []Task, index int) []Task {
	for index < len(Tasks)-1 {
		Tasks[index] = Tasks[index+1]
		index++
	}
	Tasks = Tasks[:len(Tasks)-1]
	return Tasks
}

func getTask(w http.ResponseWriter, r *http.Request) {

	json.NewEncoder(w).Encode(Tasks)
}

func postTask(w http.ResponseWriter, r *http.Request) {

	body, erro := ioutil.ReadAll(r.Body)
	var new_Task Task

	if erro != nil {
		return

	} else {
		w.WriteHeader(http.StatusCreated)

		json.Unmarshal(body, &new_Task)
		new_Task.Id = Tasks[len(Tasks)-1].Id + 1
		new_Task.CreatedAt = time.Now()
		new_Task.Height = 198
		new_Task.Neck = 40
		new_Task.Waist = 90
		new_Task.Hip = 0
		Tasks = append(Tasks, new_Task)

	}

	json.NewEncoder(w).Encode(new_Task)
}

func deleteTask(w http.ResponseWriter, r *http.Request, URL_slices []string) {

	index := searchTask(w, r, URL_slices)
	if index < 0 {
		w.WriteHeader(http.StatusNoContent)
	} else {
		Tasks = del(Tasks, index)
	}
}

func putTask(w http.ResponseWriter, r *http.Request, URL_slices []string) {
	index := searchTask(w, r, URL_slices)
	if index < 0 {
		postTask(w, r)
	} else {
		body, _ := ioutil.ReadAll(r.Body)
		var new_Task Task
		json.Unmarshal(body, &new_Task)
		new_Task.Id, _ = strconv.Atoi(URL_slices[3])
		Tasks[index] = new_Task
		json.NewEncoder(w).Encode(new_Task)
	}
}

func searchTask(w http.ResponseWriter, r *http.Request, URL_slices []string) int {

	w.Header().Set("Content-Type", "application/json")

	if len(URL_slices) < 4 {

		w.WriteHeader(http.StatusNoContent)
		return -1
	} else if len(URL_slices) == 4 || URL_slices[len(URL_slices)-1] == "" {

		id, _ := strconv.Atoi(URL_slices[3])

		for i := 0; i < len(Tasks); i++ {
			if Tasks[i].Id == id {

				w.WriteHeader(http.StatusFound)
				json.NewEncoder(w).Encode(Tasks[i])
				return i

			}
		}

		w.WriteHeader(http.StatusNoContent)
	}
	return -1
}

func http_Tasks(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	w.Header().Set("Access-Control-Allow-Origin", "*")

	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

	if r.Method == "OPTIONS" {

		return
	}
	URL_slices := strings.Split(r.URL.Path, "/")

	if len(URL_slices) < 4 || len(URL_slices) == 4 && URL_slices[3] == "" {

		if r.Method == "GET" {
			getTask(w, r)

		} else if r.Method == "POST" {
			postTask(w, r)

		}
	} else if len(URL_slices) >= 4 || URL_slices[len(URL_slices)-1] == "" {
		if r.Method == "GET" {
			searchTask(w, r, URL_slices)

		} else if r.Method == "DELETE" {
			deleteTask(w, r, URL_slices)

		} else if r.Method == "PUT" {
			putTask(w, r, URL_slices)
		}
	} else {

		w.WriteHeader(http.StatusNotFound)
	}
}

func configureRoutes() {
	http.HandleFunc("/api/todos/", http_Tasks)
	http.HandleFunc("/api/todos", http_Tasks)

}

func configureServer() {
	configureRoutes()

	log.Fatal(http.ListenAndServe(":3003", nil))
}

func main() {
	configureServer()
}
